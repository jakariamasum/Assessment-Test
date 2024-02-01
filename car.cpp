#include <bits/stdc++.h>
using namespace std;
class Car
{
public:
    string name;
    string model;
    int year;

    Car(string name, string model, int year)
        : name(name), model(model), year(year) {}

    void displayInfo()
    {
        cout << "Car Information:\n\t" << year << " " << name << " " << model << "\n\t";
    }
};

class ElectricCar : public Car
{
public:
    double batteryCapacity;

    ElectricCar(string name, string model, int year, double batteryCapacity)
        : Car(name, model, year), batteryCapacity(batteryCapacity) {}

    void displayInfo()
    {
        Car::displayInfo();
        cout << "Battery Capacity: " << batteryCapacity << " kWh\n";
    }
};

class GasCar : public Car
{
public:
    double fuelEfficiency;
    GasCar(string name, string model, int year, double fuelEfficiency)
        : Car(name, model, year), fuelEfficiency(fuelEfficiency) {}

    void displayInfo()
    {
        Car::displayInfo();
        cout << "Fuel Efficiency: " << fuelEfficiency << " MPG\n";
    }
};

int main()
{
    string carType;
    cout << "Enter car type (Electric/Gas): ";
    cin >> carType;

    string name, model;
    int year;

    cout << "Enter Name: ";
    cin.ignore();
    getline(cin, name);

    cout << "Enter model: ";
    getline(cin, model);

    cout << "Enter year: ";
    cin >> year;
    transform(carType.begin(), carType.end(), carType.begin(), ::tolower);
    if (carType == "electric")
    {
        double batteryCapacity;
        cout << "Enter battery capacity (kWh): ";
        cin >> batteryCapacity;

        ElectricCar electricCar(name, model, year, batteryCapacity);
        electricCar.displayInfo();
    }
    else if (carType == "gas")
    {
        double fuelEfficiency;
        cout << "Enter fuel efficiency (MPG): ";
        cin >> fuelEfficiency;

        GasCar gasCar(name, model, year, fuelEfficiency);
        gasCar.displayInfo();
    }
    else
    {
        cout << "Invalid car type entered.\n";
    }

    return 0;
}
