const path = require("path");

module.exports = {
    mode: "production",
    context: path.resolve(__dirname, "src"),
    entry: "./entry.js",
    output: {
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].css'
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            }
        ]
    }
}
