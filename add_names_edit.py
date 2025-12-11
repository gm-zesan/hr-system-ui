import re

# Read the file
with open('/Users/zesan/Desktop/My-Work/employee/app/employees/[id]/edit/EditEmployeeForm.js', 'r') as f:
    content = f.read()

# Find all fields that need name attributes
# Pattern: value={formData.FIELD_NAME}
field_pattern = r'value=\{formData\.(\w+)\}'
fields = re.findall(field_pattern, content)

# For each field, add name attribute if not present
for field in fields:
    # Look for the input/select with this field that doesn't have a name attribute
    # Pattern: (value={formData.FIELD}.*?)(className=) without name= in between
    pattern = rf'(value=\{{formData\.{field}\}}(?:(?!name=)[^c])*?)(className=)'
    replacement = rf'\1\n                                            name="{field}"\n                                            \2'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('/Users/zesan/Desktop/My-Work/employee/app/employees/[id]/edit/EditEmployeeForm.js', 'w') as f:
    f.write(content)

print(f"Added name attributes to EditEmployeeForm.js for fields: {', '.join(set(fields))}")
