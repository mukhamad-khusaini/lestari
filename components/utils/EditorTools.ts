const Image = require("@editorjs/image");
const Header = require("@editorjs/header");

const EDITOR_TOOLS = {
    header: {
        class: Header,
        config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 2,
        },
    },
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: "http://localhost:3000/saveImage",
                byUrl: "http://localhost:3000/saveImageUrl",
            },
        },
    },
};

export default EDITOR_TOOLS;
