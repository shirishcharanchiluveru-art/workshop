import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { db } from './db.js';
import { generateProduceAnalysis, generateVisualScan, askFreshBotSommelier } from './aiService.js';
import { ProduceInspection } from '../src/types/produce.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Multer memory storage for visual scanner image uploads
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Health & Status
app.get('/api/health', (req, res) => {
  const prefs = db.getPreferences();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiKeyStatus: prefs.apiKeyStatus,
    preferredModel: prefs.preferredModel,
    serverVersion: '1.0.0'
  });
});

// User Preferences
app.get('/api/preferences', (req, res) => {
  res.json(db.getPreferences());
});

app.post('/api/preferences', (req, res) => {
  const updated = db.updatePreferences(req.body);
  res.json(updated);
});

// Produce Inspections
app.get('/api/inspections', (req, res) => {
  res.json(db.getInspections());
});

app.get('/api/inspections/:id', (req, res) => {
  const inspection = db.getInspectionById(req.params.id);
  if (!inspection) {
    return res.status(404).json({ error: 'Inspection report not found' });
  }
  res.json(inspection);
});

app.post('/api/inspections', async (req, res) => {
  try {
    const { vegetableName, intendedRecipe, cookingTechnique, maxBudgetUsd, storeProfile, sensoryInputs, imageBase64, imageMimeType, modelOverride } = req.body;

    if (!vegetableName || !intendedRecipe) {
      return res.status(400).json({ error: 'vegetableName and intendedRecipe are required fields' });
    }

    const prefs = db.getPreferences();
    const modelToUse = modelOverride || prefs.preferredModel || 'gemini-2.5-flash';

    const aiAnalysis = await generateProduceAnalysis({
      vegetableName,
      intendedRecipe,
      cookingTechnique: cookingTechnique || 'General Cooking',
      maxBudgetUsd: Number(maxBudgetUsd) || 5.0,
      storeProfile: storeProfile || { storeType: 'Supermarket', locationRegion: 'Local Market', isOrganicPreferred: false },
      sensoryInputs: sensoryInputs || { skinTautness: 8, colorIntensity: 8, blemishCount: 0, firmnessScore: 8, scentProfile: 'Subtle', weightDensity: 'Average' },
      imageBase64,
      imageMimeType,
      modelOverride: modelToUse
    });

    const newInspection: ProduceInspection = {
      id: 'insp-' + Date.now(),
      createdAt: new Date().toISOString(),
      vegetableName,
      intendedRecipe,
      cookingTechnique: cookingTechnique || 'General Preparation',
      maxBudgetUsd: Number(maxBudgetUsd) || 5.0,
      storeProfile: storeProfile || { storeType: 'Supermarket', locationRegion: 'Local Market', isOrganicPreferred: false },
      sensoryInputs: sensoryInputs || { skinTautness: 8, colorIntensity: 8, blemishCount: 0, firmnessScore: 8, scentProfile: 'Subtle', weightDensity: 'Average' },
      imageUrl: imageBase64 ? (imageBase64.startsWith('data:') ? imageBase64 : `data:${imageMimeType || 'image/jpeg'};base64,${imageBase64}`) : undefined,
      aiAnalysis
    };

    const saved = db.saveInspection(newInspection);
    res.status(201).json(saved);
  } catch (error: any) {
    console.error('Error creating inspection:', error);
    res.status(500).json({ error: 'Failed to process produce analysis', details: error.message });
  }
});

app.delete('/api/inspections/:id', (req, res) => {
  const deleted = db.deleteInspection(req.params.id);
  if (deleted) {
    res.json({ success: true, message: 'Inspection report removed' });
  } else {
    res.status(404).json({ error: 'Inspection not found' });
  }
});

// Visual Scanner
app.get('/api/scans', (req, res) => {
  res.json(db.getScans());
});

app.post('/api/scans', upload.single('photo'), async (req, res) => {
  try {
    let base64Image = '';
    let mimeType = 'image/jpeg';

    if (req.file) {
      base64Image = req.file.buffer.toString('base64');
      mimeType = req.file.mimetype;
    } else if (req.body.imageBase64) {
      base64Image = req.body.imageBase64.replace(/^data:image\/\w+;base64,/, '');
      mimeType = req.body.imageMimeType || 'image/jpeg';
    } else {
      return res.status(400).json({ error: 'Photo or base64 image data is required' });
    }

    const scanResult = await generateVisualScan(base64Image, mimeType);
    const saved = db.saveScan(scanResult);
    res.status(201).json(saved);
  } catch (error: any) {
    console.error('Error conducting visual scan:', error);
    res.status(500).json({ error: 'Failed to complete visual scan', details: error.message });
  }
});

// Seasonal Radar
app.get('/api/seasonal', (req, res) => {
  res.json(db.getSeasonalProduce());
});

// Shopping List
app.get('/api/shopping', (req, res) => {
  res.json(db.getShoppingList());
});

app.post('/api/shopping', (req, res) => {
  const { vegetableName, variety, quantity, targetRecipe, qualityNote, estimatedCost } = req.body;
  if (!vegetableName) {
    return res.status(400).json({ error: 'vegetableName is required' });
  }

  const newItem = {
    id: 'shop-' + Date.now(),
    vegetableName,
    variety: variety || 'Standard Variety',
    quantity: quantity || '1 lb / 1 item',
    targetRecipe: targetRecipe || 'Daily Meal',
    qualityNote: qualityNote || 'Check firmness & taut skin',
    completed: false,
    estimatedCost: Number(estimatedCost) || 2.99
  };

  const saved = db.addShoppingListItem(newItem);
  res.status(201).json(saved);
});

app.patch('/api/shopping/:id/toggle', (req, res) => {
  const updated = db.toggleShoppingListItem(req.params.id);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ error: 'Shopping item not found' });
  }
});

app.delete('/api/shopping/:id', (req, res) => {
  const deleted = db.deleteShoppingListItem(req.params.id);
  if (deleted) {
    res.json({ success: true, message: 'Item deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// FreshBot Sommelier Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, contextProduce } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const replyText = await askFreshBotSommelier(messages, contextProduce);
    res.json({
      reply: {
        id: 'msg-' + Date.now(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Error in FreshBot chat:', error);
    res.status(500).json({ error: 'Failed to process sommelier chat', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`FreshMatch AI Server running at http://localhost:${PORT}`);
});
