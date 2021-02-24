import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BuggysComponent } from './buggys.component';

@NgModule({
    declarations: [
        BuggysComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [BuggysComponent]
})

export class BuggysModule{ }