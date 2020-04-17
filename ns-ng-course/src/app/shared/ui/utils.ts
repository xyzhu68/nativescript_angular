import * as application from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";

export class Utils {
    static getStatusBarHeight() {
        let result:number = 0;
        let resourceId:number = application.android.context.getResources().getIdentifier("status_bar_height", "dimen", "android");
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
