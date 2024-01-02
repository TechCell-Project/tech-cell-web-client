/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    typescript: {
        ignoreBuildErrors: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '**',
            },
        ],
        // domains: ['res.cloudinary.com'],
    },
    env: {
        API_ENDPOINT: process.env.API_BASE_URL,
        URL_HOST_SOCKET_IO: process.env.URL_HOST_SOCKET_IO,
    },

    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
        // '@mui/material': {
        //     transform:
        //         '{{#if (eq member "useTheme")}}@components/Theme/useTheme{{else}}@mui/material/{{member}}{{/if}}',
        // },
    },

    transpilePackages: ['@TechCell-Project/tech-cell-server-node-sdk'],

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        });
        return config;
    },
};

module.exports = nextConfig;
