from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup

def get_page_source(url):
    try:
        driver = webdriver.Chrome()
        driver.get(url)
        WebDriverWait(driver, 60).until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'body')))
        with open("output_page.txt", "w") as file:
            file.write(driver.page_source)
        driver.quit()
    except Exception:
        driver.quit()


urls = [
"https://smiski.com/e/products/moving-series/",
"https://smiski.com/e/products/exercising-series/",
"https://smiski.com/e/products/dressing-series/",
"https://smiski.com/e/products/work/",
"https://smiski.com/e/products/museum/",
"https://smiski.com/e/products/cheer/",
"https://smiski.com/e/products/yoga-series/",
"https://smiski.com/e/products/bed/",
"https://smiski.com/e/products/living/",
"https://smiski.com/e/products/bath-series/",
"https://smiski.com/e/products/toilet-series/",
"https://smiski.com/e/products/series-4/",
"https://smiski.com/e/products/series-3/",
"https://smiski.com/e/products/series-2/",
"https://smiski.com/e/products/series-1/",
]

def main():
    content = {}
    for url in urls:
        try:
            series = url.split("/")[-2]
            content[series] = {
                'names': [],
                'images': [],
            }
            imgBase = "https://smiski.com/e"

            get_page_source(url)
            with open("output_page.txt", "r") as file:
                html = file.read()
            soup = BeautifulSoup(html, 'html.parser')

            for div in soup.find_all('div', class_='centered-image-holder'):
                content[series]['names'].append(div.find('h5').text) if div.find('h5') else "NONE"
                content[series]['images'].append(imgBase + div.find('img')['src']) if div.find('img') else "NONE"
        except Exception as e:
            print(e)
            print(f"Error with {url}")
    print(content)


if __name__ == "__main__":
    main()