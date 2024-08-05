import sys
import requests

def download_file(url, type):
    filename = 'downloaded_video.mp4' if type == 'video' else 'downloaded_audio.mp3'
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        with open(filename, 'wb') as file:
            file.write(response.content)
        print(f"File created: {filename}")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    url = sys.argv[1]
    type = sys.argv[2]
    download_file(url, type)
