

export default function useViteServer({
    publicDir = 'public',
    middlewareMode = false,
    setupMiddlewares = null,
} = {}) {

    if (!setupMiddlewares) {
        setupMiddlewares = (middlewares, devServer) => {
            middlewares.use((req, res, next) => {
                if (req.url.startsWith('/assets/')) {
                    const fs = require('fs');
                    const path = require('path');
                    const assetPath = path.join(devServer.config.root, req.url);
                    if (!fs.existsSync(assetPath)) {
                        res.statusCode = 404;
                        res.end('404 Not Found');
                        return;
                    }
                }
                next();
            });
            return middlewares;
        };
    }

    return {
        // Serve assets directory only in dev server
        publicDir: publicDir,
        middlewareMode,
        setupMiddlewares,
    }
}