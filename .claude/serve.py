import functools
import http.server

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory="/Users/erikolofsson/Desktop/MG-dev")
http.server.test(HandlerClass=handler, port=4173)
