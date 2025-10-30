import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import React from 'react';

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: '12/B , Pathberiya,Parakaduwa,Rathnapura,Sri lanka  '
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '036-2257052  ,  071-6082362'
      
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'pabasaraproducts@gmail.com'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or need assistance? We'd love to hear from you. 
            Get in touch with our friendly team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={5} 
                    placeholder="Tell us how we can help you..."
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1">{info.title}</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {info.details}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Visit Our Factory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We welcome visitors to see our production process and learn about 
                  traditional sweet-making techniques. Please call ahead to schedule 
                  a visit.
                </p>
                <Button variant="outline" className="w-full">
                  Schedule a Visit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wholesale Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Interested in stocking our products? Contact our wholesale team 
                  for pricing and availability information.
                </p>
                <Button variant="outline" className="w-full">
                  Wholesale Information
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2">Do you ship island-wide?</h3>
                <p className="text-muted-foreground">
                  Yes, we deliver to all major cities and towns across Sri Lanka. 
                  Delivery times vary based on location.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2">What are your ingredients?</h3>
                <p className="text-muted-foreground">
                  We use only natural, locally-sourced ingredients with no artificial 
                  preservatives or colorings.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2">How long do products stay fresh?</h3>
                <p className="text-muted-foreground">
                  Our products have varying shelf lives. Most items stay fresh for 
                  2-4 weeks when stored properly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2">Do you accept custom orders?</h3>
                <p className="text-muted-foreground">
                  Yes, we accept custom orders for special events and celebrations. 
                  Please contact us for details.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}