require 'spec_helper'
require 'pry'
describe Post do

  #let(:user) { FactoryGirl.create(:user) }
before { @post = Post.new(title:"test555", link:"http://google.de", user_id:1) }

  subject { @post }


it { should respond_to(:title) }
it { should respond_to(:link) }


  describe "with blank title" do
    before { @post.title = " " }
    it { should_not be_valid }
  end

    describe "with blank link" do
    before { @post.link = " " }
    it { should_not be_valid }
  end

  describe "with link that is too long" do
    before { @post.link = "a" * 141  }
    it { should_not be_valid }
  end

  describe "with title that is too short" do
    before { @post.title = "a" * 4 }
    it { should_not be_valid }
  end

  describe "with title that is too long" do
    before { @post.title = "a" * 141 }
    it { should_not be_valid }
  end


describe "when url format is invalid" do
    it "should be invalid" do
      addresses = %w[htp://zweitag.de http://zweitag,de http://zweitag http://www.zweitag.x]
      addresses.each do |invalid_address|
        @post.link = invalid_address
        should_not be_valid
      end      
    end
  end

  describe "when url format is valid" do
    it "should be valid" do
      addresses = %w[http://zweitag.de http://zweitag.com http://www.zweitag.de http://www.zweitag.de/url?id=5]

      addresses.each do |valid_address|
        @post.link = valid_address
        #binding.pry
        should be_valid
      end   

    end
  end



  end
