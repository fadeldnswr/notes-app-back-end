/*
    * Membuat fungsi untuk mengontrol request dan response dari user
    * Seperti menambah notes, menghapus notes, mengubah notes, dan membaca notes
 */
const { nanoid } = require( "nanoid" )
const notes = require( "./notes" )

const addNoteHandler = (request, h) => {
    // Membuat key title, tags, body, dan id
    const {title, tags, body} = request.payload
    const id = nanoid(16)

    // Tanggal membuat notes
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    // Membuat Notes Baru
    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }

    // Menambahkan note baru ke dalam notes
    notes.push(newNote)

    const isSuccess = notes.filter((note) => note.id === id).length > 0

    // Control Flow Response (Success and Failed)
    if(isSuccess){
        const response = h.response({
            status: "Success",
            message: "Catatan berhasil ditambahkan!",
            data: {
                noteId: id,
            },
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: "Failed",
        message: "Catatan gagal ditambahkan..."
    })
    response.code(500)
    return response
}

const getAllNotesHandler = () => ({
    status: "Success",
    data: {
        notes
    }
})

const getNotesbyHandlerId = (request, h) => {
    const {id} = request.params
    const note = notes.filter((n) => n.id === id)[0]

    if(note !== undefined){
        return {
            status: "Success",
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: "Failed",
        message: "Catatan tidak ditemukan",
    })
    response.code(404)
    return response
}

const editNotesbyHandlerId = (request, h) => {
    const { id } = request.params
    const { title, tags, body } = request.payload
    const updatedAt = new Date().toISOString()
    const index = notes.findIndex((note) => note.id === id )

    if(index !== -1){
        notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt
        }
        const response = h.response({
            status: "Success",
            message: "Catatan berhasil diperbaharui"
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: "Failed",
        message: "Gagal mengedit catatan, Id tidak ditemukan"
    })
    response.code(404)
    return response
}

const deleteNotebyHandlerId = (request, h) => {
    const { id } = request.params
    const index = notes.findIndex((note) => note.id === id )

    if(index !== -1){
        notes.splice(index, 1)
        const response = h.response({
            status: "Success",
            message: "Notes berhasil dihapus"
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: "Failed",
        message: "Gagal menghapus notes, Id tidal ditemukan"
    })
    response.code(404)
    return response
}

module.exports = {
    addNoteHandler, 
    getAllNotesHandler, 
    getNotesbyHandlerId, 
    editNotesbyHandlerId,
    deleteNotebyHandlerId
}