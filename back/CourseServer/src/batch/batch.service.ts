import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import puppeteer, { Browser, Page } from 'puppeteer';
import { Cheerio, CheerioAPI, Element, load } from 'cheerio';

@Injectable()
export class BatchService implements OnApplicationBootstrap {
    constructor(){}

    @Cron('0 0 * * * *')
    async run(){}

    onApplicationBootstrap() {
        this.run();
    }
}
