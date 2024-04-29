import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: async (req, file, cb) => {
        const name = `${Date.now()}.` + file.originalname.split(".").pop()
        cb(null, name)

    }
})

const upload = multer({ storage })

export default upload