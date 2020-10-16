import { Platform } from "react-native"

export const Fonts = {
    OpenSans: {
        Regular: Platform.OS == 'ios' ? 'OpenSans-Regular': 'OpenSansRegular',
        SemiBold: Platform.OS == 'ios' ? 'OpenSans-SemiBold': 'OpenSansSemiBold',
    }
}