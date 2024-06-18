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

# import csv

# phone_data = []
# csv_file = 'plastic-case-list.csv'

# with open(csv_file, 'r', newline='') as file:
#     reader = csv.reader(file, delimiter=',')
    
#     # Define brand names and the column indices for brand/model pairs
#     brands = ["iPhone","Asus","Google","Honor","Infinix","Lenovo","Moto","Nokia","OnePlus","Oppo","Poco","Realme","Samsung","Vivo","Redmi"]
#     brand_indices = {brand: idx for idx, brand in enumerate(brands)}
    
#     for row in reader:
#         for brand, idx in brand_indices.items():
#             model = row[idx]
#             if model:
#                 phone_data.append({
#                     'brand': 'iPhone' if brand == 'Apple iPhone' else brand,
#                     'model': model,
#                     'case_material': 'hardcase'
#                 })

# print(phone_data)
