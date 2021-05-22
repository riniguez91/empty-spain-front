import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  /**
   * Filters user input based on the towns available in the database
   * 
   * @param towns: any[] 
   * @param searchText: string
   * @returns any[] 
   */
  transform(towns: any[], searchText: string): any[] {
    // Check for empty parameters
    if (!towns) return [];
    if (!searchText) return [];

    searchText = searchText.toLowerCase()
    return towns.filter(town => { return town.toLowerCase().includes(searchText) }); 
  }
}
