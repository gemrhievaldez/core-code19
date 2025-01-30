import java.util.Scanner;

public class StudentGradeCalculator {
    public static void main(String[] args) {
        // Get student information
        try (Scanner scanner = new Scanner(System.in)) {
            // Get student information
            System.out.print("Enter your name: ");
            String name = scanner.nextLine();
            
            System.out.print("Enter your student ID: ");
            String studentId = scanner.nextLine();
            
            // Collect grades
            double[] grades = new double[5];
            for (int i = 0; i < grades.length; i++) {
                while (true) {
                    try {
                        System.out.print("Enter grade for subject " + (i + 1) + ": ");
                        grades[i] = scanner.nextDouble();
                        if (grades[i] >= 0 && grades[i] <= 100) {
                            break;
                        } else {
                            System.out.println("Please enter a grade between 0 and 100.");
                        }
                    } catch (Exception e) {
                        System.out.println("Invalid input. Please enter a numerical grade.");
                        scanner.next(); // clear the invalid input
                    }
                }
            }
            
            // Calculate the average grade
            double total = 0;
            for (double grade : grades) {
                total += grade;
            }
            double average = total / grades.length;
            
            // Determine the letter grade
            char letterGrade;
            if (average >= 90) {
                letterGrade = 'A';
            } else if (average >= 80) {
                letterGrade = 'B';
            } else if (average >= 70) {
                letterGrade = 'C';
            } else if (average >= 60) {
                letterGrade = 'D';
            } else {
                letterGrade = 'F';
            }
            
            // Display the results
            System.out.println("\nStudent Information:");
            System.out.println("Name: " + name);
            System.out.println("Student ID: " + studentId);
            System.out.println("Average Grade: " + average);
            System.out.println("Letter Grade: " + letterGrade);
        }
    }
}
