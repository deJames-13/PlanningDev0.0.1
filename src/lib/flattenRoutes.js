export default (routes, parentPath = '') => {
    return routes.flatMap(route => {
        const fullPath = `${parentPath}${route.path}`.replace(/\/{2,}/g, '/'); // Avoid double slashes
        const breadcrumb = parentPath
            ? `${parentPath.replace(/\/$/, '')} > ${route.name}`
            : route.name;

        const current = { ...route, breadcrumb, fullPath };
        if (route.children) {
            return [current, ...flattenRoutes(route.children, fullPath)];
        }
        return current;
    });
};

