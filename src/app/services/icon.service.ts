import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const LOGOUT = 'assets/svg/logout.svg';
const GROUP_USER = 'assets/svg/group-users.svg';
const USER_CIRCLE = 'assets/svg/user-circle.svg';
const HOME = 'assets/svg/home.svg';
const ANALYTIC = 'assets/svg/analytic.svg';
const BAG = 'assets/svg/bag.svg';
const CART = 'assets/svg/cart.svg';
const USERS = 'assets/svg/users-svgrepo-com.svg';
const SETTING = 'assets/svg/setting.svg';
const SEARCH = 'assets/svg/search.svg';
const MERCHANT_SHOP = 'assets/svg/merchant-shop.svg';
const EDIT = 'assets/svg/edit.svg';
const ARROW_RIGHT = 'assets/svg/arrow-right.svg';
const CHECK_SUCCESS = 'assets/svg/check-success.svg';
const CHECK_ERROR = 'src/assets/svg/check-error.svg';
const CLOSE_TOAST = 'assets/svg/close-toast.svg';
const CHECK_WARNING = 'assets/svg/check-warning.svg';
const ERROR = 'assets/svg/error.svg';
const PAYPAL_ICON = 'assets/svg/paypal-icon.svg';
const CONFIRM = 'assets/svg/confirm.svg';
const PAYMENT = 'assets/svg/payment.svg';
const APP = 'assets/svg/app.svg';
const STOREFRONT = 'assets/svg/storefront.svg';
const FULFILLMENT = 'assets/svg/fulfillment.svg';
const ATTACHMENT = 'assets/svg/attachment.svg';
const EMAIL = 'assets/svg/email.svg';
const PAYPAL_IMG = 'assets/svg/paypal-img.svg';
const TRACK_MSG1 = 'assets/svg/track-msg1.svg';
const TRACK_MSG2 = 'assets/svg/track-msg2.svg';
const GOOGLE = 'assets/svg/google.svg';
const PROJECT = 'assets/svg/project.svg';
const FILE_ZIPPER = 'assets/svg/file-zipper.svg';
const REPORT = 'assets/svg/report.svg';
const UPLOAD = 'assets/svg/upload.svg';
const RULE = 'assets/svg/rule.svg';
const SCORE = 'assets/svg/score.svg';
const SUBMITTED = 'assets/svg/submitted.svg';
const IMPORT = 'assets/svg/import.svg';
const QUESTION_MARK = 'assets/svg/question-mark.svg';
const TICKED_COLOR = 'assets/svg/ticked-color.svg';
const COMMENTS_LOGS = 'assets/svg/comments-logs.svg';
const RECYCLE = 'assets/svg/recycle.svg';
const ALERT_CLOCK = 'assets/svg/alert-clock.svg';

@Injectable({
  providedIn: 'root',
})
export class SVGService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon('logout', this.generateUrl(LOGOUT));
    this.matIconRegistry.addSvgIcon('group-user', this.generateUrl(GROUP_USER));
    this.matIconRegistry.addSvgIcon('user-circle', this.generateUrl(USER_CIRCLE));
    this.matIconRegistry.addSvgIcon('home', this.generateUrl(HOME));
    this.matIconRegistry.addSvgIcon('analytic', this.generateUrl(ANALYTIC));
    this.matIconRegistry.addSvgIcon('bag', this.generateUrl(BAG));
    this.matIconRegistry.addSvgIcon('cart', this.generateUrl(CART));
    this.matIconRegistry.addSvgIcon('users', this.generateUrl(USERS));
    this.matIconRegistry.addSvgIcon('setting', this.generateUrl(SETTING));
    this.matIconRegistry.addSvgIcon('search', this.generateUrl(SEARCH));
    this.matIconRegistry.addSvgIcon('merchant-shop', this.generateUrl(MERCHANT_SHOP));
    this.matIconRegistry.addSvgIcon('edit', this.generateUrl(EDIT));
    this.matIconRegistry.addSvgIcon('arrow-right', this.generateUrl(ARROW_RIGHT));
    this.matIconRegistry.addSvgIcon('check-success', this.generateUrl(CHECK_SUCCESS));
    this.matIconRegistry.addSvgIcon('check-error', this.generateUrl(CHECK_ERROR));
    this.matIconRegistry.addSvgIcon('close-toast', this.generateUrl(CLOSE_TOAST));
    this.matIconRegistry.addSvgIcon('error', this.generateUrl(ERROR));
    this.matIconRegistry.addSvgIcon('paypal-icon', this.generateUrl(PAYPAL_ICON));
    this.matIconRegistry.addSvgIcon('confirm', this.generateUrl(CONFIRM));
    this.matIconRegistry.addSvgIcon('payment', this.generateUrl(PAYMENT));
    this.matIconRegistry.addSvgIcon('app', this.generateUrl(APP));
    this.matIconRegistry.addSvgIcon('storefront', this.generateUrl(STOREFRONT));
    this.matIconRegistry.addSvgIcon('fulfillment', this.generateUrl(FULFILLMENT));
    this.matIconRegistry.addSvgIcon('attachment', this.generateUrl(ATTACHMENT));
    this.matIconRegistry.addSvgIcon('email', this.generateUrl(EMAIL));
    this.matIconRegistry.addSvgIcon('paypal-img', this.generateUrl(PAYPAL_IMG));
    this.matIconRegistry.addSvgIcon('track-msg1', this.generateUrl(TRACK_MSG1));
    this.matIconRegistry.addSvgIcon('track-msg2', this.generateUrl(TRACK_MSG2));
    this.matIconRegistry.addSvgIcon('check-warning', this.generateUrl(CHECK_WARNING));
    this.matIconRegistry.addSvgIcon('google', this.generateUrl(GOOGLE));
    this.matIconRegistry.addSvgIcon('project', this.generateUrl(PROJECT));
    this.matIconRegistry.addSvgIcon('file-zipper', this.generateUrl(FILE_ZIPPER));
    this.matIconRegistry.addSvgIcon('report', this.generateUrl(REPORT));
    this.matIconRegistry.addSvgIcon('upload', this.generateUrl(UPLOAD));
    this.matIconRegistry.addSvgIcon('rule', this.generateUrl(RULE));
    this.matIconRegistry.addSvgIcon('score', this.generateUrl(SCORE));
    this.matIconRegistry.addSvgIcon('submitted', this.generateUrl(SUBMITTED));
    this.matIconRegistry.addSvgIcon('import', this.generateUrl(IMPORT));
    this.matIconRegistry.addSvgIcon('question-mark', this.generateUrl(QUESTION_MARK));
    this.matIconRegistry.addSvgIcon('ticked-color', this.generateUrl(TICKED_COLOR));
    this.matIconRegistry.addSvgIcon('comments-logs', this.generateUrl(COMMENTS_LOGS));
    this.matIconRegistry.addSvgIcon('recycle', this.generateUrl(RECYCLE));
    this.matIconRegistry.addSvgIcon('alert-clock', this.generateUrl(ALERT_CLOCK));
  }

  private generateUrl(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
