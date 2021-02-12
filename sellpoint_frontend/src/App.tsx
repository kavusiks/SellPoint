import React, { FunctionComponent } from "react";
import "./App.css";
import Ad from "./Ad";

const App: FunctionComponent = () => {
  return (
    <div>
      <Ad 
      price={20} 
      title="Båt" 
      image="/logo512.png"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis suscipit risus quis ullamcorper. Proin ac tempor magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean in congue velit. Nulla et lacinia neque, sed tristique est. Morbi porta in augue ut dictum. Etiam ultricies quam a tincidunt rhoncus. Sed sit amet euismod diam. Nunc rutrum elit ac elit venenatis, ac pulvinar urna pharetra. Suspendisse et nulla in turpis placerat condimentum. Morbi suscipit sodales ipsum a molestie. Donec quis luctus purus. Praesent mattis sem tellus.

      Vivamus consequat vulputate feugiat. Praesent nec nunc auctor, aliquam purus laoreet, eleifend neque. Aliquam cursus arcu ac fringilla pulvinar. Quisque aliquet justo vitae ipsum tincidunt, vel ultrices quam tempus. Duis sed condimentum sem. Duis eleifend ultricies pretium. Ut imperdiet facilisis turpis, nec semper sem ultricies ut. Sed sed pharetra mauris, sit amet auctor odio. Pellentesque ut magna eu est pellentesque rhoncus in eget libero. Aenean in diam et ante tristique elementum. Sed placerat est magna, ac volutpat lectus ullamcorper at. Morbi sagittis neque a ornare condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque ac enim ac augue sodales rutrum.
      
      Duis at purus ut justo pulvinar finibus. Phasellus euismod tellus eget leo egestas, quis ullamcorper dui blandit. Nullam eget auctor nisl. Nam nunc urna, hendrerit scelerisque luctus eget, molestie sit amet odio. Ut nec dui leo. Integer consequat justo sed tempus laoreet. Mauris mollis fringilla bibendum. Nunc iaculis risus neque, nec luctus sem ultrices sit amet. Donec vel placerat augue. Phasellus a sem est. Maecenas eget imperdiet nulla, commodo facilisis nisl. Nunc ac mauris iaculis, hendrerit justo vel, posuere lectus. Pellentesque aliquet volutpat ex, non ullamcorper neque malesuada a. Donec nec lacus urna.
      
      Ut sodales maximus tempor. Aliquam sodales, nisi non convallis auctor, eros lacus ornare purus, ac varius nibh nisi vitae eros. Morbi luctus pellentesque enim, at hendrerit magna tincidunt sed. Integer sed elit at nisl consectetur pulvinar et eget dui. Phasellus quis lorem bibendum, finibus est nec, convallis odio. Curabitur dolor risus, pulvinar eu lectus et, placerat sagittis nisi. Praesent egestas elit at rhoncus viverra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum venenatis eros justo, at volutpat magna fringilla eget.
      
      In vel lectus id enim ultrices volutpat eu quis tellus. Nam euismod velit vel quam tempor maximus. Proin vel dui fringilla, aliquam nibh vitae, bibendum velit. Nulla vitae augue ut massa interdum volutpat. Aliquam placerat ante vitae convallis malesuada. Fusce sed commodo enim. Curabitur nec dui condimentum, varius nisl a, egestas turpis. Quisque ac dapibus neque, id finibus mauris. Donec neque nisl, pharetra et finibus ut, semper sed diam. Duis laoreet orci sed volutpat imperdiet. Nullam velit mi, ullamcorper eu elit ut, cursus feugiat lorem. Ut ultricies metus id consectetur efficitur. Sed ut mi lorem."/>
    </div>
  );
};

export default App;
