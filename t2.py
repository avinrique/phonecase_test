import csv
phone_data = []
csv_file = 'phone_models.csv'
with open(csv_file, 'r', newline='') as file:
    reader = csv.DictReader(file)
    
    for row in reader:
        brand = row['brand']
        model = row['model']
        case_material = row['case_material']
        phone_data.append({'brand': brand, 'model': model, 'case_material': case_material})
print(phone_data)
