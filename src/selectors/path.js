export default (path, userApps) => {
    if (userApps) {
        return userApps.filter((userApp) => {
            return userApp.domainName.replace('http://', '').replace(window.location.hostname, '') === path
        }).length > 0 ? path : '/';
    } else {
        return '/';
    }
}