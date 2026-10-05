import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProduceInspection, VisualScanResult, SeasonalProduceItem, ShoppingListItem, UserPreferences } from '../src/types/produce.js';
import { INITIAL_INSPECTIONS, INITIAL_SEASONAL_PRODUCE, INITIAL_VISUAL_SCANS, INITIAL_SHOPPING_LIST } from './data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'db.json');

interface DatabaseSchema {
  inspections: ProduceInspection[];
  scans: VisualScanResult[];
  seasonalProduce: SeasonalProduceItem[];
  shoppingList: ShoppingListItem[];
  userPreferences: UserPreferences;
}

class FreshMatchDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadFromFile();
  }

  private loadFromFile(): DatabaseSchema {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.warn('Error reading database file, resetting to initial seed:', error);
    }

    const defaultData: DatabaseSchema = {
      inspections: INITIAL_INSPECTIONS,
      scans: INITIAL_VISUAL_SCANS,
      seasonalProduce: INITIAL_SEASONAL_PRODUCE,
      shoppingList: INITIAL_SHOPPING_LIST,
      userPreferences: {
        unitSystem: 'Imperial (lbs, °F)',
        defaultStore: 'Farmers Market',
        dietaryFocus: 'General',
        preferredModel: 'gemini-2.5-flash',
        apiKeyStatus: process.env.GEMINI_API_KEY ? 'Configured' : 'Missing'
      }
    };

    this.saveToFile(defaultData);
    return defaultData;
  }

  private saveToFile(data: DatabaseSchema = this.data) {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to persist database file:', error);
    }
  }

  // Inspection queries
  public getInspections(): ProduceInspection[] {
    return this.data.inspections;
  }

  public getInspectionById(id: string): ProduceInspection | undefined {
    return this.data.inspections.find((i) => i.id === id);
  }

  public saveInspection(inspection: ProduceInspection): ProduceInspection {
    this.data.inspections.unshift(inspection);
    this.saveToFile();
    return inspection;
  }

  public deleteInspection(id: string): boolean {
    const initialLen = this.data.inspections.length;
    this.data.inspections = this.data.inspections.filter((i) => i.id !== id);
    if (this.data.inspections.length !== initialLen) {
      this.saveToFile();
      return true;
    }
    return false;
  }

  // Visual Scan queries
  public getScans(): VisualScanResult[] {
    return this.data.scans;
  }

  public saveScan(scan: VisualScanResult): VisualScanResult {
    this.data.scans.unshift(scan);
    this.saveToFile();
    return scan;
  }

  // Seasonal produce queries
  public getSeasonalProduce(): SeasonalProduceItem[] {
    return this.data.seasonalProduce;
  }

  // Shopping List queries
  public getShoppingList(): ShoppingListItem[] {
    return this.data.shoppingList;
  }

  public addShoppingListItem(item: ShoppingListItem): ShoppingListItem {
    this.data.shoppingList.unshift(item);
    this.saveToFile();
    return item;
  }

  public toggleShoppingListItem(id: string): ShoppingListItem | undefined {
    const item = this.data.shoppingList.find((s) => s.id === id);
    if (item) {
      item.completed = !item.completed;
      this.saveToFile();
      return item;
    }
    return undefined;
  }

  public deleteShoppingListItem(id: string): boolean {
    const len = this.data.shoppingList.length;
    this.data.shoppingList = this.data.shoppingList.filter((s) => s.id !== id);
    if (this.data.shoppingList.length !== len) {
      this.saveToFile();
      return true;
    }
    return false;
  }

  // User preferences queries
  public getPreferences(): UserPreferences {
    this.data.userPreferences.apiKeyStatus = process.env.GEMINI_API_KEY ? 'Configured' : 'Missing';
    return this.data.userPreferences;
  }

  public updatePreferences(prefs: Partial<UserPreferences>): UserPreferences {
    this.data.userPreferences = {
      ...this.data.userPreferences,
      ...prefs
    };
    this.saveToFile();
    return this.data.userPreferences;
  }
}

export const db = new FreshMatchDatabase();
