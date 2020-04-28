import * as application from 'tns-core-modules/application/application';
import { isAndroid } from 'tns-core-modules/platform/platform';

export class Utils {
    static getStatusBarHeight() {
        let result = 0;
        const resourceId = application.android.context.getResources().getIdentifier('status_bar_height', 'dimen', 'android');
        if (resourceId > 0) {

            result = application.android.context.getResources().getDimensionPixelSize(resourceId);
        }
        // console.log("statusbar height (in px): ", result);
        return result;
    }
    static statusbarHeight() {
        return isAndroid ? this.getStatusBarHeight().toString() + 'px' : '0';
    }
}
