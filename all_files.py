import os

def list_files_and_contents(start_path):
    for root, dirs, files in os.walk(start_path):
        for file in files:
            file_path = os.path.join(root, file)
            print("FILE NAME: " + file_path)
            print()
            try:
                with open(file_path, 'r', encoding='utf-8') as file_content:
                    print(file_content.read())
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")
            print("\n--------------------------------\n")

start_path = 'src'
list_files_and_contents(start_path)
