import java.util.Scanner;

public class SimpleChatbot {
    public static void main(String[] args) {
        // Greet the user and ask for their name
        try (Scanner scanner = new Scanner(System.in)) {
            // Greet the user and ask for their name
            System.out.println("Hello! What's your name?");
            String name = scanner.nextLine();
            System.out.println("Nice to meet you, " + name + "! How can I assist you today? (Type 'exit' to quit)");
            
            // Chat loop
            while (true) {
                String userInput = scanner.nextLine().toLowerCase();
                
                if (userInput.equals("exit")) {
                    System.out.println("Goodbye, " + name + "! Have a great day!");
                    break; // Exit the loop
                } else if (userInput.contains("how are you")) {
                    System.out.println("I'm just a computer program, but I'm doing well!");
                } else if (userInput.contains("what is your name")) {
                    System.out.println("I'm a simple chatbot created in Java.");
                } else if (userInput.contains("what can you do")) {
                    System.out.println("I can chat with you and answer simple questions.");
                } else {
                    System.out.println("I'm sorry, I don't understand that.");
                }
            }
        }
    }
}
