import os
import webbrowser
import socket
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
import threading
import json
import update

from urllib.parse import urlparse, parse_qs

def get_url_arguments(url):
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    return {key: value[0] if len(value) == 1 else value for key, value in query_params.items()}

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
  def do_GET(self):
    if self.path.startswith('/api/'):
      if self.path.startswith('/api/hasPythonAccess'):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = {'hasPython': True}
        self.wfile.write(json.dumps(response).encode('utf-8'))
        return
      elif self.path.startswith('/api/isUpdateAvailable'):
        available = update.isUpdateAvailable()
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = {'isAvailable': available}
        self.wfile.write(json.dumps(response).encode('utf-8'))
        return
      elif self.path.startswith('/api/update'):
        success = update.update()
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = {'success': success}
        self.wfile.write(json.dumps(response).encode('utf-8'))
        return
    super().do_GET()

class HTTPServer:
  def __init__(self, port=0, directory = ''):
    self.directory = directory
    self.port = port
    self.server = None
    self.thread = None

  def start_server(self):
    """Starts the HTTP server in a separate thread."""
    os.chdir(self.directory)
    handler = CustomHTTPRequestHandler
    self.server = TCPServer(("0.0.0.0", self.port), handler)
    self.port = self.server.server_address[1]

    print(f"Serving {os.path.abspath(self.directory)} on port {self.port}...")
      
    # Start server in a new thread
    self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
    self.thread.start()

  def stop_server(self):
    """Stops the HTTP server."""
    if self.server:
      print("Stopping server...")
      self.server.shutdown()
      self.server.server_close()
      self.thread.join()
    print("Server stopped.")

  def get_port(self):
    """Returns the port being used by the server."""
    return self.port

if __name__ == "__main__":
  server = HTTPServer(directory='player')
  server.start_server()
  print(f"HTTP server running on port {server.get_port()} (at http://localhost:{server.get_port()}/).")
  webbrowser.open_new(f'http://localhost:{server.get_port()}/')
  input("Press Enter to stop the server...\n")
  server.stop_server()
