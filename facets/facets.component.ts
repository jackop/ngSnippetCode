import { Component, OnInit } from '@angular/core';
import { faListAlt, faWindowRestore, faFile, faCalendarAlt, faDatabase, faCaretDown, faCaretUp, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {DataService } from '../services/data/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  // Icons
  faListAlt = faListAlt;
  faWindowRestore = faWindowRestore;
  faFile = faFile;
  faCalendarAlt = faCalendarAlt;
  faDatabase = faDatabase;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  // selected filters
  selected: Array<string> = [];
  checked = false;
  // collapse values
  openAuthors = false;
  openCategories = false;
  openFiles = false;
  openDates = false;
  openSources = false;
  // more values
  moreAuthors = false;
  moreCategories = false;
  moreFiles = false;
  moreDates = false;
  moreSources = false;
  categoryFacet: any;
  sourceFacet: any;
  fileTypeFacets: any;
  dateFacet: any;
  authorsFacet: any;

  facets: any;
  category: any;
  source: any;
  fileType: any;
  date: any;
  authors: any;

  constructor(private translate: TranslateService, private dataService: DataService) {
    this.dataService.getRequest().subscribe(results => {
       this.facets = results['components'].facets.entries;
       this.category = results['components'].facets.entries[0].items;
       this.source = results['components'].facets.entries[1].items;
       this.fileType = results['components'].facets.entries[2].items;
       this.date = results['components'].facets.entries[3].selectableItems;
       this.authors = results['components'].facets.entries[4].items;
       this.showFirstFacets(4, this.category, this.source, this.fileType, this.date, this.authors);
    });
    this.translate.setDefaultLang('pl');
    }
  ngOnInit() {
  }

  /**
   * Function for checked option
   * @param val
   */
  letsCheck(val) {
    if (this.selected.indexOf(val) === -1) {
      this.selected.push(val);
      this.checked = true;
    } else if (this.selected.indexOf(val) >= 0) {
      this.selected.splice(this.selected.indexOf(val), 1);
      this.checked = false;
    }
  }

  /**
   * @param val
   */
  stringContain(val: Number): boolean {
    return this.selected.indexOf(val) >= 0;
  }

  showAuthors() {
    this.openAuthors = !this.openAuthors;
  }

  showCategories() {
    this.openCategories = !this.openCategories;
  }

  showFiles() {
    this.openFiles = !this.openFiles;
  }

  showDates() {
    this.openDates = !this.openDates;
  }

  showSources() {
    this.openSources = !this.openSources;
  }

  /**
   * Initial first values
   * @param num
   * @param category
   * @param source
   * @param fileType
   * @param date
   * @param authors
   */
  showFirstFacets(num: Number, category: any, source: any, fileType: any, date: any, authors: any) {
    this.categoryFacet = category.slice(0, num);
    this.sourceFacet = source.slice(0, num);
    this.fileTypeFacets = fileType.slice(0, num);
    this.dateFacet = date.slice(0, num);
    this.authorsFacet = authors.slice(0, num);
  }

  /**
   * @param num
   * @param authors
   */
  showAuthorsFacet(num: any, authors: any) {
    this.moreAuthors = !this.moreAuthors;
    this.authorsFacet = authors.slice(0, num);
  }

  /**
   * @param num
   * @param categories
   */
  showCategoriesFacet(num: Number, categories: any) {
    this.categoryFacet = categories.slice(0, num);
    this.moreCategories = !this.moreCategories;
  }

  /**
   * Show only [num] first values and mark this as a checked
   * @param num
   * @param fileTypes
   */
  showFilesFacet(num: Number, fileTypes: any) {
    this.fileTypeFacets = fileTypes.slice(0, num);
    this.moreFiles = !this.moreFiles;
  }

  /**
   * Show only [num] first values and mark this as a checked
   * @param num
   * @param dates
   */
  showDatesFacet(num: Number, dates: any) {
    this.dateFacet = dates.slice(0, num);
    this.moreDates = !this.moreDates;
  }

  /**
   * Show only [num] first values and mark this as a checked
   * @param num
   * @param sources
   */
  showSourcesFacet(num: Number, sources: any) {
    this.sourceFacet = sources.slice(0, num);
    this.moreSources = !this.moreSources;
  }
}
