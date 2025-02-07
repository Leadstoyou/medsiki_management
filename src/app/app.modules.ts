import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoRootModule } from '#core/translate.module';
import { ShareModule } from '#components/share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from '#core/jwt.interceptor';
import { HttpErrorHandler } from '#services/http-error-handler.service';
import { DialogComponent } from '#components/core/dialog/dialog.component';
import { AppHttpClient } from '#services/app-http-client.service';
import { AuthService } from '#services/auth.service';
import { BaseComponent } from '#components/core/base/base.component';
import { ToastComponent } from '#components/core/toast/toast.component';
import { MainLayoutComponent } from '#components/layout/main-layout/main-layout.component';
import { AuthRepository } from '#repositories/auth.repository';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GroupRepository } from '#repositories/group.repository';
import { FileRepository } from '#repositories/file.repository';
import { StudentRepository } from '#repositories/student.repository';
import { UserRepository } from '#repositories/user.repository';
import { GalleryRepository } from '#repositories/gallery.repository';
import { MaterialRepository } from '#repositories/material.repository';
import { RulesRepository } from '#repositories/rules.repository';
import { ReportRepository } from '#repositories/report.repository';
import { ProjectTrackingRepository } from '#repositories/prj.repository';
import { GitRepository } from '#repositories/git.repository';
import { GradeRepository } from '#repositories/grade.repository';

import { RequestRepository } from '#repositories/request.repository';
import { NotificationRepository } from '#repositories/notification.repository';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { CustomIntl } from '#services/custom-intl.service';
import { SemesterRepository } from '#repositories/semester.repository';
import { NewFeedRepository } from '#repositories/new-feed.repository';
import { environment } from '#environments/environment';
registerLocaleData(en);
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
@NgModule({
  declarations: [AppComponent, BaseComponent, MainLayoutComponent],
  imports: [
    ShareModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    MatIconModule,
    SocketIoModule,
    TranslocoModule,
    AppRoutingModule,
    TranslocoRootModule,
    BrowserAnimationsModule,
    FormsModule,
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: CustomIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
  ],
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideAnimationsAsync(),
    HttpErrorHandler,
    DialogComponent,
    ToastComponent,
    AppHttpClient,
    AuthService,
    AuthRepository,
    GroupRepository,
    FileRepository,
    StudentRepository,
    UserRepository,
    GalleryRepository,
    MaterialRepository,
    RulesRepository,
    ReportRepository,
    ProjectTrackingRepository,
    GitRepository,
    GradeRepository,
    RequestRepository,
    NotificationRepository,
    SemesterRepository,
    NewFeedRepository,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
