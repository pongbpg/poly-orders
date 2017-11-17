export default (path, userApps) => {
    if (userApps) {
        return userApps.filter((userApp) => {
            return userApp.callbackUrl === path
        }).length > 0 ? path : '/';
    } else {
        return '/';
    }
}