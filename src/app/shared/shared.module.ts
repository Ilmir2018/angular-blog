import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { QuillModule } from "ngx-quill";
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot()
    ],
    exports: [
        HttpClientModule,
        QuillModule
    ],
    declarations: [
    ]
})

export class SharedModule {
    
}