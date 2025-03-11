import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '#components/share/share.module';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { CourseComponent } from './course/course.component';
import { CourseManageComponent } from './course/course-manage/course-manage.component';
import { ProductComponent } from './product/product.component';
import { NewsComponent } from './news/news.component';
import { ChatComponent } from './chat/chat.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { CreateNewsComponent } from './news/create-news/create-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    CourseComponent,
    CourseManageComponent,
    ProductComponent,
    NewsComponent,
    ChatComponent,
    CreateCourseComponent,
    EditCourseComponent,
    CreateProductComponent,
    EditProductComponent,
    CreateNewsComponent,
    EditNewsComponent,
    PaymentComponent
  ],
  imports: [CommonModule, AdminRoutingModule, ShareModule],
})
export class AdminModule {}
