export function authGuardRouter(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send({ error: "Not authenticated" });
  }
  next();
}

export function authGuardSocket(socket, next) {
  try {
    const user = socket.request.session.user;

    if (!user) return next(new Error("Unauthorized"));

    next();
  } catch (err) {
    next(err);
  }
}
