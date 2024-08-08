import sys
import requests

def download_file(url, type):
    filename = 'downloaded_video.mp4' if type == 'video' else 'downloaded_audio.mp3'
    print(f"Downloading {url} as {filename}")

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        print(f"Response status code: {response.status_code}")
        print(f"Response headers: {response.headers}")

        with open(filename, 'wb') as file:
            file.write(response.content)
        print(f"File created: {filename}")

    except requests.exceptions.RequestException as e:
        print(f"Error downloading file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 download.py <url> <type>")
        sys.exit(1)

    url = sys.argv[1]
    type = sys.argv[2]
    print(f"Arguments received: URL={url}, Type={type}")
    download_file(url, type)
