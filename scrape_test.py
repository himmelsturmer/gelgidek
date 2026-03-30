import requests
from bs4 import BeautifulSoup

url = "https://www.vizedunyasi.com/vizebilgisi/almanya"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

print("--- Select elements ---")
selects = soup.find_all('select')
for select in selects:
    print(f"Select ID: {select.get('id')}, Name: {select.get('name')}")
    for option in select.find_all('option'):
        print(f"  Option: {option.text.strip()} (value: {option.get('value')})")

print("\n--- Forms ---")
forms = soup.find_all('form')
for form in forms:
    print(f"Form Action: {form.get('action')}, Method: {form.get('method')}")
    for inp in form.find_all('input'):
        print(f"  Input: {inp.get('name')}={inp.get('value')} (type: {inp.get('type')})")
