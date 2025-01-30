def get_student_info():
    # Get basic student information
    name = input("Enter your name: ")
    age = input("Enter your age: ")
    student_id = input("Enter your student ID: ")
    
    # Collect grades
    grades = []
    for i in range(1, 6):
        while True:
            try:
                grade = float(input(f"Enter your final grade for subject {i}: "))
                if 0 <= grade <= 100:
                    grades.append(grade)
                    break
                else:
                    print("Please enter a grade between 0 and 100.")
            except ValueError:
                print("Invalid input. Please enter a numerical grade.")
    
    # Calculate average grade
    average_grade = sum(grades) / len(grades)
    
    # Display the information and average grade
    print("\nStudent Information:")
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"Student ID: {student_id}")
    print(f"Average Grade: {average_grade:.2f}")

# Run the program
get_student_info()
