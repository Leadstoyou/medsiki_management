import { inject, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '#components/core/table/table.component';

/* Antd Module */
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCardModule } from 'ng-zorro-antd/card';
import { en_US, NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { DragDropModule, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { TagInputModule } from 'ngx-chips';

// /* Common Module */
import { EmptyPipe } from '#pipes/empty.pipe';
import { ButtonComponent } from '#components/core/button/button.component';
import { FragmentComponent } from '#components/core/fragment/fragment.component';
import { LoadingComponent } from '#components/core/loading/loading.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ValidationErrorComponent } from '#components/core/validation-error/validation-error.component';
import { DialogComponent } from '#components/core/dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ProgressWaitComponent } from '#components/core/progress-wait/progress-wait.component';
import { ToastComponent } from '#components/core/toast/toast.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { CardAnalyticComponent } from '#components/core/card/card-analytic/card-analytic.component';
import { MenuComponent } from '#components/core/menu/menu.component';
import { FormElementComponent } from '#components/core/form-element/form-element.component';
import { BreadCrumbComponent } from '#components/core/bread-crumb/bread-crumb.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DropdownComponent } from '#components/core/dropdown/dropdown.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { MemoPipe } from '#pipes/memo.pipe';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { PositiveIntegerNumberDirective } from 'src/app/directives/positive-integer-number.directive';
import { ImageFragmentComponent } from '#components/core/image-fragment/image-fragment.component';
import { RestrictDecimalDirective } from 'src/app/directives/restrict-decimal.directive';
import { NavbarComponent } from '#components/layout/components/navbar/navbar.component';
import { NgxEditorModule } from 'ngx-editor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { OrderByPipe } from '#pipes/sort.pipe';
import { StripHtmlPipe } from '#pipes/stripe-html.pipe';
import { SelectFileReportComponent } from '#components/core/select/select-file-report/select-file-report.component';
import { NotificationComponent } from '#components/layout/components/notification/notification.component';
import { TimeagoModule } from 'ngx-timeago';
import { ScrollingModule } from '@angular/cdk/scrolling';

// /* Customize Module */

registerLocaleData(en);
registerLocaleData(vi);

const ANTD_MODULES = [
  FormsModule,
  NzSpinModule,
  NzFormModule,
  NzListModule,
  NzIconModule,
  NzGridModule,
  NzTableModule,
  NzModalModule,
  NzBadgeModule,
  NzInputModule,
  MatIconModule,
  NzStepsModule,
  NzUploadModule,
  NzSelectModule,
  NzButtonModule,
  NzLayoutModule,
  NzPopoverModule,
  NzDividerModule,
  NzToolTipModule,
  DragDropModule,
  CdkDropList,
  CdkDrag,
  TranslocoModule,
  NzCommentModule,
  NzDropDownModule,
  NzSkeletonModule,
  NzProgressModule,
  NzCollapseModule,
  NzTimelineModule,
  NzStatisticModule,
  NzDatePickerModule,
  NzBreadCrumbModule,
  NzTypographyModule,
  NzPaginationModule,
  ReactiveFormsModule,
  NzDescriptionsModule,
  NzRadioModule,
  NzCardModule,
  NzCheckboxModule,
  NzTabsModule,
  NzImageModule,
  NzTagModule,
  NzSkeletonModule,
  TagInputModule,
  NzDrawerModule,
  NzSpaceModule,
  NzQRCodeModule,
  NzSwitchModule,
  NzAvatarModule,
  NzBackTopModule,
  NzCarouselModule,
  NzRateModule,
  EditorModule,
  TimeagoModule,
  ScrollingModule,
];

const COMMON_MODULE = [
  EmptyPipe,
  TableComponent,
  DialogComponent,
  ButtonComponent,
  LoadingComponent,
  FragmentComponent,
  ValidationErrorComponent,
  ToastComponent,
  ProgressWaitComponent,
  CardAnalyticComponent,
  MenuComponent,
  FormElementComponent,
  BreadCrumbComponent,
  DropdownComponent,
  MemoPipe,
  ImageFragmentComponent,
  RestrictDecimalDirective,
  PositiveIntegerNumberDirective,
  NavbarComponent,
  OrderByPipe,
  StripHtmlPipe,
  SelectFileReportComponent,
  NotificationComponent,
];
@NgModule({
  declarations: [...COMMON_MODULE,],
  imports: [CommonModule, ...ANTD_MODULES, NgxEditorModule],
  exports: [CommonModule, ...ANTD_MODULES, ...COMMON_MODULE, NgxEditorModule],
  providers: [
    DatePipe,
    {
      provide: NZ_I18N,
      useFactory: () => {
        const localId = inject(LOCALE_ID);
        switch (localId) {
          case 'en':
            return en_US;
          case 'vi':
            return vi_VN;
          default:
            return en_US;
        }
      },
    },
  ],
})
export class ShareModule {}
