const fs =require("fs");
const path = require("path");
const less = require("less");
const NpmImportPlugin = require("less-plugin-npm-import");
const sources = {
    "./src/themes/dark/antd.less": [
        "antd-dark.css",
        "antd-dark.rawcss",
    ],
    "./src/themes/light/antd.less": [
        "antd-light.css",
        "antd-light.rawcss",
    ],
    "./src/themes/yellow-light/antd.less": [
        "antd-yellow-light.css",
        "antd-yellow-light.rawcss",
    ],
    "./src/themes/sapphire/antd.less": [
        "antd-sapphire.css",
        "antd-sapphire.rawcss",
    ],
    "./src/themes/juntong/antd.less": [
        "antd-juntong.css",
        "antd-juntong.rawcss",
    ],
    "./src/themes/gray/antd.less": [
        "antd-gray.css",
        "antd-gray.rawcss",
    ],
}

const options = {
    javascriptEnabled: true,
    plugins: [
        new NpmImportPlugin({prefix: "~"})
    ]
};

const promises = Object.keys(sources).map( async src => {
    const lessContent = await fs.promises.readFile(src, {encoding: "utf8"});
    const rendered = await less.render(lessContent, {
        ...options,
        paths: [...options.paths || [], path.dirname(src)]
    });
    await Promise.all(sources[src].map(dest => fs.promises.writeFile(dest, rendered.css)));
});

Promise.all(promises).then(() => process.exit(0))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

setInterval(() => {}, 1000);
