import java.util.Scanner;

public class simpleATM {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double balance = 1000.00;
        int choice;

        System.out.println("Welcome to Simple ATM!");

        while (true) {
            // Display menu options
            System.out.println("\n1. Check Balance");
            System.out.println("2. Deposit Funds");
            System.out.println("3. Withdraw Funds");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    // Check Balance
                    System.out.printf("Your current balance is: $%.2f\n", balance);
                    break;

                case 2:
                    // Deposit Funds
                    System.out.print("Enter amount to deposit: $");
                    double depositAmount = scanner.nextDouble();
                    if (depositAmount > 0) {
                        balance += depositAmount;
                        System.out.printf("Successfully deposited! Your new balance is: $%.2f\n", balance);
                    } else {
                        System.out.println("Invalid deposit amount. Please try again.");
                    }
                    break;

                case 3:
                    // Withdraw Funds
                    System.out.print("Enter amount to withdraw: $");
                    double withdrawAmount = scanner.nextDouble();
                    if (withdrawAmount > 0 && withdrawAmount <= balance) {
                        balance -= withdrawAmount;
                        System.out.printf("Successfully withdrawn! Your new balance is: $%.2f\n", balance);
                    } else if (withdrawAmount > balance) {
                        System.out.println("Insufficient funds. Please try a smaller amount.");
                    } else {
                        System.out.println("Invalid withdraw amount. Please try again.");
                    }
                    break;

                case 4:
                    // Exit
                    System.out.println("Thank you for using Simple ATM. Goodbye!");
                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid choice. Please select 1, 2, 3, or 4.");
            }
        }
    }
}
