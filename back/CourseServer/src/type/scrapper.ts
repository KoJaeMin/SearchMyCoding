import { Cheerio, CheerioAPI, Element } from "cheerio";
import { Page } from "puppeteer";
import { CourseType } from "./course";

export interface ScrapperType {
    scrapping(page : Page) : void;
    extractCourseInfoFromHTML(api : CheerioAPI): CourseType[];
    extractCourseInfo(api: CheerioAPI, courseElement: Cheerio<Element>) : CourseType[];
}
