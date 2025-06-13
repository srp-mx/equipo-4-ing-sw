package assets

import (
	"image"
	"math/rand"
	"strings"
)

// BodyType enum
type BodyType int

const (
	MaleBody BodyType = iota + 1
	MuscularBody
	FemaleBody
	PregnantBody
	TeenBody
	ChildBody
)

func (self BodyType) String() string {
	switch self {
	case MaleBody:
		return "male"
	case MuscularBody:
		return "muscular"
	case FemaleBody:
		return "female"
	case PregnantBody:
		return "pregnant"
	case TeenBody:
		return "teen"
	case ChildBody:
		return "child"
	default:
		return ""
	}
}

// Json format for body types
type jsonBodyTypes struct {
	Male     *string `json:"male,omitempty"`
	Muscular *string `json:"muscular,omitempty"`
	Female   *string `json:"female,omitempty"`
	Pregnant *string `json:"pregnant,omitempty"`
	Teen     *string `json:"teen,omitempty"`
	Child    *string `json:"child,omitempty"`
}

// Json format for layers
type jsonLayer struct {
	ZPos            int    `json:"zPos"`
	CustomAnimation string `json:"custom_animation"`
	jsonBodyTypes
}

// Json format for credits
type jsonCredit struct {
	File     string   `json:"file"`
	Notes    string   `json:"notes"`
	Authors  []string `json:"authors"`
	Licenses []string `json:"licenses"`
	Urls     []string `json:"urls"`
}

// Json format for spritesheet sets
type jsonSpritesheet struct {
	Name       string       `json:"name"`
	TypeName   string       `json:"type_name"`
	Layer1     *jsonLayer   `json:"layer_1,omitempty"`
	Layer2     *jsonLayer   `json:"layer_2,omitempty"`
	Layer3     *jsonLayer   `json:"layer_3,omitempty"`
	Layer4     *jsonLayer   `json:"layer_4,omitempty"`
	Layer5     *jsonLayer   `json:"layer_5,omitempty"`
	Layer6     *jsonLayer   `json:"layer_6,omitempty"`
	Layer7     *jsonLayer   `json:"layer_7,omitempty"`
	Layer8     *jsonLayer   `json:"layer_8,omitempty"`
	Variants   []string     `json:"variants"`
	Animations []string     `json:"animations"`
	Credits    []jsonCredit `json:"credits"`
}

// A layer of a spritesheet
type Layer struct {
	Sheet image.Image
	ZPos  int
}

// An individual spritesheet instance
type Spritesheet struct {
	Name      string
	Type      string
	Variant   string
	Animation string
	Body      BodyType
	// Layers should already be Z-sorted from low to high
	Layers      []Layer
	CreditPaths []string
}

// The spritesheet 'database'
type SpritesheetRepo struct {
	spritesheets []*Spritesheet
	// Indexes to filter items
	byName    map[string]map[*Spritesheet]struct{}
	byType    map[string]map[*Spritesheet]struct{}
	byVariant map[string]map[*Spritesheet]struct{}
	byBody    map[BodyType]map[*Spritesheet]struct{}
}

// A hashset of spritesheet pointers
type spritesheetSet = map[*Spritesheet]struct{}

// A map from values to sets of spritesheet pointers that match it
type spritesheetIndex = map[string]spritesheetSet
type spritesheetBodyIndex = map[BodyType]spritesheetSet

// Starts up an empty spritesheet repository
func NewSpritesheetRepo() *SpritesheetRepo {
	return &SpritesheetRepo{
		spritesheets: []*Spritesheet{},
		byName:       make(spritesheetIndex),
		byType:       make(spritesheetIndex),
		byVariant:    make(spritesheetIndex),
		byBody:       make(spritesheetBodyIndex),
	}
}

// Add a spritesheet to the repository
func (self *SpritesheetRepo) Add(s *Spritesheet) {
	self.spritesheets = append(self.spritesheets, s)
	addIndex := func(index spritesheetIndex, key string) {
		if _, ok := index[key]; !ok {
			index[key] = make(spritesheetSet)
		}
		index[key][s] = struct{}{}
	}

	// Add string indexes
	addIndex(self.byName, s.Name)
	addIndex(self.byType, s.Type)
	addIndex(self.byVariant, s.Variant)

	// Add BodyType index
	if _, ok := self.byBody[s.Body]; !ok {
		self.byBody[s.Body] = make(spritesheetSet)
	}
	self.byBody[s.Body][s] = struct{}{}
}

// Get all spritesheets matching all non-empty attributes (for body, empty is 0)
func (self *SpritesheetRepo) Query(name, typ, variant string, body BodyType) []*Spritesheet {
	// Make an array of sets for each matching element
	var sets []spritesheetSet
	addSet := func(attribute string, index spritesheetIndex) []*Spritesheet {
		if attribute != "" {
			if set, ok := index[attribute]; ok {
				sets = append(sets, set)
			} else {
				return []*Spritesheet{}
			}
		}
		return nil
	}
	if r := addSet(name, self.byName); r != nil {
		return r
	}
	if r := addSet(typ, self.byType); r != nil {
		return r
	}
	if r := addSet(variant, self.byVariant); r != nil {
		return r
	}
	if body != 0 {
		if set, ok := self.byBody[body]; ok {
			sets = append(sets, set)
		} else {
			return []*Spritesheet{}
		}
	}

	// If all filters are off, return the whole thing
	if len(sets) == 0 {
		return self.spritesheets
	}

	// Iterate over the smallest set
	small := sets[0]
	for _, set := range sets {
		if len(set) < len(small) {
			small = set
		}
	}
	var result []*Spritesheet
NextCandidate:
	for s := range small {
		for _, set := range sets {
			if _, ok := set[s]; !ok {
				continue NextCandidate
			}
		}
		result = append(result, s)
	}
	return result
}

// Gets a random spritesheet that matches the query (or nil if there is no match)
func (self *SpritesheetRepo) Random(name, typ, variant string, body BodyType) *Spritesheet {
	match := self.Query(name, typ, variant, body)
	if len(match) == 0 {
		return nil
	}
	return match[rand.Intn(len(match))]
}

// Returns the URI associated with the spritesheet
func (self *Spritesheet) ToUri() string {
	return self.Name + "::" + self.Type + "::" + self.Variant
}

// Returns the spritesheet associated with the URI
func (self *SpritesheetRepo) FromUri(uri string, body BodyType) *Spritesheet {
	if body == 0 {
		return nil
	}
	uriParts := strings.Split(uri, "::")
	if len(uriParts) != 3 {
		return nil
	}
	q := self.Query(uriParts[0], uriParts[1], uriParts[2], body)
	if len(q) != 1 {
		return nil
	}
	return q[0]
}

// TODO: load all images and build up the spritesheetrepo object from the spritesheet definitions
// TODO: add function to make an image out of a list/set of spritesheets
