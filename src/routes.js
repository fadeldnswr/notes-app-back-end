/*
    * Membuat module untuk mengontrol routes method pada Website 
    * GET, POST, PUT, DELETE
 */
const { addNoteHandler, getAllNotesHandler, getNotesbyHandlerId, editNotesbyHandlerId , deleteNotebyHandlerId } = require( "./handler" )

const route = [
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler
    },
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotesHandler
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler : getNotesbyHandlerId
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: editNotesbyHandlerId
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNotebyHandlerId
    }
]

module.exports = route