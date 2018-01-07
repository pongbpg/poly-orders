export default (apps, userApps) => {
    if (userApps) {
        return apps
            .filter(f => f.isActive)
            .map((app) => {
                return {
                    ...app,
                    hasSelected: userApps.filter((f) => {
                        return f.appId === app.id
                    }).length > 0
                }
            });
    } else {
        return apps;
    }
};