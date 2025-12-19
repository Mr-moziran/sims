#!/usr/bin/env python3
import argparse
import functools
import http.server
import os
import socketserver
import threading

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def serve(directory: str, port: int) -> socketserver.TCPServer:
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=directory)
    httpd = socketserver.TCPServer(("0.0.0.0", port), handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd


def main() -> None:
    parser = argparse.ArgumentParser(description="Run vulnerable and fixed demo sites.")
    parser.add_argument("--vulnerable-port", type=int, default=8081)
    parser.add_argument("--fixed-port", type=int, default=8082)
    args = parser.parse_args()

    vulnerable_dir = os.path.join(BASE_DIR, "vulnerable")
    fixed_dir = os.path.join(BASE_DIR, "fixed")

    vulnerable_server = serve(vulnerable_dir, args.vulnerable_port)
    fixed_server = serve(fixed_dir, args.fixed_port)

    print(f"Vulnerable site: http://localhost:{args.vulnerable_port}/")
    print(f"Fixed site: http://localhost:{args.fixed_port}/")
    try:
        while True:
            threading.Event().wait(1)
    except KeyboardInterrupt:
        pass
    finally:
        vulnerable_server.shutdown()
        fixed_server.shutdown()


if __name__ == "__main__":
    main()
