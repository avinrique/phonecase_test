import csv

phone = ["iPhone", "OnePlus", "Oppo", "Vivo", "Redmi", "SAMSUNG", "Honor", "Moto", "Asus", "Nokia", "IQOO", "TECNO", "INFINIX", "Google", "Nothing", "Micromax"]
phonemodeldict = {}
phonec = -1

with open('phone_models.txt', 'r') as file:
    for line in file:
        k = line.strip()
        if k in phone:
            phonec += 1
            phonemodeldict[phone[phonec]] = []
        else:
            
            models = [model.strip() for model in k.split('/')]
            phonemodeldict[phone[phonec]].extend(models)

data = []
for brand, models in phonemodeldict.items():
    for model in models:
        data.append({'brand': brand, 'model': model, 'case_material': 'softcase'})

with open('phone_models.csv', 'w', newline='') as csvfile:
    fieldnames = ['brand', 'model', 'case_material']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerows(data)

print("CSV file 'phone_models.csv' has been created.")
