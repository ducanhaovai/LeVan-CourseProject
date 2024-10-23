"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./components/button";
import { Card, CardContent, CardFooter } from "./components/card";
import { Input } from "./components/input";
import { Label } from "./components/label";
import { RadioGroup, RadioGroupItem } from "./components/radio-group";
import { SelectWithSearch } from "./components/select";
import { Checkbox } from "./components/checkbox";
import { CreditCard, Globe } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { getCourseDetails } from "api/apiAdmin";
import { makePayment } from "api/apiPayments";
import { jwtDecode } from "jwt-decode";
const countries = [
  { value: "vietnam", label: "Vietnam" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "japan", label: "Japan" },
  { value: "south-korea", label: "South Korea" },
  { value: "china", label: "China" },
];

export default function CourseCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [selectedCountry, setSelectedCountry] = useState("vietnam");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");
  const currentUser = token ? jwtDecode(token) : null;
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseId = searchParams.get("courseId");
        const courseData = await getCourseDetails(courseId);
        setCourse(courseData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching course details");
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course data available</div>;
  const handlePayment = async () => {
    try {
      const user_id = currentUser?.id;
      const course_id = course?.id;
      const amount = course?.price;

      if (!user_id || !course_id || !amount) {
        console.error("Missing required fields: user_id, course_id, or amount");
        return;
      }

      const paymentData = await makePayment({
        user_id, // Send user_id
        course_id, // Send course_id
        amount, // Send course amount
        payment_method: paymentMethod, // Send payment method
        transaction_id: "random_transaction_id_" + Math.random().toString(36).substring(7), // Generate a random transaction ID
      });

      if (paymentData) {
        alert("Payment successful!");
        // Perform additional actions if needed
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Billing address</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <SelectWithSearch
                      options={countries}
                      placeholder="Select a country"
                      onChange={setSelectedCountry}
                      value={selectedCountry}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Udemy is required by law to collect applicable transaction taxes for purchases
                    made in certain tax jurisdictions.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment method</h2>
                <Card>
                  <CardContent className="pt-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 mb-4">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center">
                          <img
                            src="/placeholder.svg?height=20&width=60"
                            alt="PayPal"
                            className="h-5 mr-2"
                          />
                          PayPal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <RadioGroupItem value="mastercard" id="mastercard" />
                        <Label htmlFor="mastercard" className="flex items-center">
                          <CreditCard className="mr-2 h-5 w-5" />
                          MasterCard **** 9121
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Credit/Debit Card
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <div className="flex items-center space-x-2">
                      <img src="/placeholder.svg?height=20&width=30" alt="Visa" className="h-5" />
                      <img
                        src="/placeholder.svg?height=20&width=30"
                        alt="Mastercard"
                        className="h-5"
                      />
                      <img src="/placeholder.svg?height=20&width=30" alt="Amex" className="h-5" />
                      <img
                        src="/placeholder.svg?height=20&width=30"
                        alt="Discover"
                        className="h-5"
                      />
                    </div>
                  </CardFooter>
                </Card>
                {paymentMethod === "credit-card" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on card</Label>
                      <Input id="cardName" placeholder="Name on card" />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <Label htmlFor="expiryDate">Expiry date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="w-1/2">
                        <Label htmlFor="cvc">CVC/CVV</Label>
                        <Input id="cvc" placeholder="CVC" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saveCard" />
                      <Label htmlFor="saveCard">
                        Securely save this card for my later purchase
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Order details</h2>
                  <div className="flex items-center space-x-4">
                    <img
                      src="/placeholder.svg?height=50&width=50"
                      alt="Course thumbnail"
                      className="w-12 h-12 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-muted-foreground">₫{course.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Original Price:</span>
                    <span>₫{course.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₫{course.price.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  By completing your purchase you agree to these Terms of Service.
                </p>
                <Button
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
                  onClick={handlePayment}
                >
                  Complete Checkout
                </Button>
                <p className="text-sm text-center mt-4">30-Day Money-Back Guarantee</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
