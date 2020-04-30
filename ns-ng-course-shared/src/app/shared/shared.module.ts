import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActionBarComponent } from '../shared/ui/action-bar/action-bar.component';


@NgModule({
    imports: [RouterModule, CommonModule],
    declarations: [ActionBarComponent],
    exports: [ActionBarComponent]
})
export class SharedModule {}
