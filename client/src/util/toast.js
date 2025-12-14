import toastr from "toastr";

const defaultOptions = {
    closeButton: true,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: 3000
};

function show(type, message, title) {
    toastr.options = { ...defaultOptions };
    toastr[type](message, title);
}

export function toastSuccess(message, title) {
    show("success", message, title);
}

export function toastInfo(message, title) {
    show("info", message, title);
}

export function toastWarning(message, title) {
    show("warning", message, title);
}

export function toastError(message, title) {
    show("error", message, title);
}
