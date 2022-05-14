import { Injectable } from '@angular/core';
import { IKeyValue } from '../common/common.interface';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  constructor() {
  }

  public set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public write(data: IKeyValue): void {
    try {
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key]);
      });
    } catch (e) {
      console.error('Error writing data to localStorage', e);
    }
  }

  public get(key: string): any {
    try {
      const value = localStorage.getItem(key);
      return value ?? null;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  public remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage', e);
    }
  }
}
